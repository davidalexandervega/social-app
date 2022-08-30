from django.views.decorators.csrf import csrf_exempt
import re
import json
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.authentication import JWTAuthentication
JWT_authenticator = JWTAuthentication()

from dotenv import load_dotenv
load_dotenv()

import cloudinary
import cloudinary.uploader
import cloudinary.api
config = cloudinary.config(secure=True)

from app.models import User, Post, Reply, Notification
from app.serializers import CustomTokenObtainPairSerializer ,UserSerializer, PostSerializer, ReplySerializer, NotificationSerializer

# Create your views here.

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

@csrf_exempt
def userApi(request, user_id=0):
  if request.method == 'GET':
    user = User.objects.get(id=user_id)
    user_serializer = UserSerializer(user)
    return JsonResponse(user_serializer.data, safe=False)
  elif request.method == 'POST':
    user_data = JSONParser().parse(request)
    user_serializer = UserSerializer(data=user_data)
    if user_serializer.is_valid(raise_exception=True):
      user_serializer.save()
      return JsonResponse('created a user', safe=False)
  elif request.method == 'PUT':
    user_data = JSONParser().parse(request)
    user = User.objects.get(id=user_data['id'])
    user_serializer = UserSerializer(user, data=user_data)
    if user_serializer.is_valid():
      user_serializer.save()
      return JsonResponse('updated a user', safe=False)
  elif request.method == 'DELETE':
    user = User.objects.get(id=user_id)
    user.delete()
    return JsonResponse('deleted a user')

@csrf_exempt
def postApi(request):
  response = JWT_authenticator.authenticate(request)
  if response is not None:
    username , token = response
    userID = token.payload['user_id']
    if (request.method == 'GET') and (request.path == '/api/posts/all'):
      posts = Post.objects.all()
      if posts:
        return JsonResponse(PostSerializer(posts, many=True).data, safe=False)
      return JsonResponse([], safe=False)
    elif (request.method == 'GET') and (request.path == '/api/posts/user'):
      posts = Post.objects.get(user=userID)
      return JsonResponse(PostSerializer(posts, many=True).data, safe=False)
    elif (request.method == 'GET') and (request.GET['mode'] == 'origin'):
      post = Post.objects.get(id=request.GET['id'])
      if post:
        return JsonResponse(PostSerializer(post).data, safe=False)
      return JsonResponse('post not found', safe=False)
    elif (request.method == 'GET') and (request.GET['mode'] == 'replies'):
      replies = Reply.objects.all().filter(origin=request.GET['id'])
      if replies:
        return JsonResponse(ReplySerializer(replies, many=True).data, safe=False)
      return JsonResponse([], safe=False)
    elif request.method == 'POST':
      post_data = JSONParser().parse(request)
      post_data['user'] = userID
      post_serializer = PostSerializer(data=post_data)
      # print(post_serializer.is_valid())
      # print(post_serializer.errors)
      if post_serializer.is_valid():
        post_serializer.save()
        return JsonResponse(post_data, safe=False)
    elif (request.method == 'PUT') and ('like' in request.path):
      post_data = JSONParser().parse(request)
      post = Post.objects.get(id=post_data['id'])
      post_serializer = PostSerializer(post, data=post_data)
      if post_serializer.is_valid():
        post_serializer.save()
        return JsonResponse(post_data, safe=False)
    elif request.method == 'DELETE':
      post_id = (request.path.split('/api/posts/'))[1]
      post = Post.objects.get(id=post_id)
      if post.image == True:
        cloudinary.uploader.destroy('posts/' + post_id)
      post_serializer = PostSerializer(post)
      if str(post.user_id) == userID:
        print(post_serializer.data)
        post.delete()
        return JsonResponse(post_serializer.data, safe=False)
  else:
    return JsonResponse('no token is present in the header, or no header', safe=False)

@csrf_exempt
def replyApi(request):
  response = JWT_authenticator.authenticate(request)
  if response is not None:
    username , token = response
    userID = token.payload['user_id']
    if request.method == 'POST':
      reply_data = JSONParser().parse(request)
      reply_data['user'] = userID
      reply_serializer = ReplySerializer(data=reply_data)
      if reply_serializer.is_valid():
        reply_serializer.save()
        origin = Post.objects.get(id=reply_data['origin'])
        origin.replies.append(reply_data['id'])
        origin.save()
        return JsonResponse(reply_data, safe=False)
    elif (request.method == 'PUT') and ('like' in request.path):
      reply_data = JSONParser().parse(request)
      reply = Reply.objects.get(id=reply_data['id'])
      reply_serializer = ReplySerializer(reply, data=reply_data)
      if reply_serializer.is_valid():
        reply_serializer.save()
        return JsonResponse(reply_data, safe=False)
    elif request.method == 'DELETE':
      reply = Reply.objects.get(id=request.path.split('/api/replies/')[1])
      reply_serializer = ReplySerializer(reply)
      if str(reply.user_id) == userID:
        origin = Post.objects.get(id=reply_serializer.data['origin'])
        print('*** origin ', origin)
        origin.replies.remove(reply.id)
        origin.save()
        reply.delete()
        return JsonResponse(reply_serializer.data, safe=False)
  else:
    return JsonResponse('no token is present in the header, or no header', safe=False)


@csrf_exempt
def notificationApi(request):
  response = JWT_authenticator.authenticate(request)
  if response is not None:
    username , token = response
    userID = token.payload['user_id']
    if request.method == 'POST':
      notification_data = JSONParser().parse(request)
      notification_serializer = NotificationSerializer(data=notification_data)
      if notification_serializer.is_valid():
        notification_serializer.save()
        return JsonResponse(notification_data, safe=False)
    elif request.method == 'GET':
      notifications = Notification.objects.all().filter(target_id=userID)
      if notifications:
        return JsonResponse(NotificationSerializer(notifications, many=True).data, safe=False)
      return JsonResponse([], safe=False)