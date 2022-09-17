from django.views.decorators.csrf import csrf_exempt
import re
import json
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.contrib.auth.hashers import check_password, make_password
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
from app.serializers import CustomTokenObtainPairSerializer, UserSerializer, PostSerializer, ReplySerializer, NotificationSerializer

# Create your views here.

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

@csrf_exempt
def userApi(request, user_id=0):
  if request.method == 'GET':
    user = User.objects.get(username=request.GET['username'])
    if user:
      user_serializer = UserSerializer(user)
      return JsonResponse(user_serializer.data, safe=False)
    return JsonResponse('user not found', safe=False)
  elif request.method == 'POST':
    user_data = JSONParser().parse(request)
    user_serializer = UserSerializer(data=user_data)
    if user_serializer.is_valid(raise_exception=True):
      user_serializer.save()
      return JsonResponse('created a user', safe=False)
  elif request.method == 'PUT' and ('edit-profile' in request.path):
    profile_data = JSONParser().parse(request)
    user = User.objects.get(id=profile_data['id'])
    if profile_data['deleteBanner'] == True:
      cloudinary.uploader.destroy('banners/' + profile_data['id'])
    if profile_data['deletePicture'] == True:
      cloudinary.uploader.destroy('pictures/' + profile_data['id'])
    user.banner = profile_data['banner']
    user.picture = profile_data['picture']
    user.bio = profile_data['bio']
    user.save()
    posts = Post.objects.all().filter(user=profile_data['id'])
    if posts:
      for post in posts:
        post.userPicture = profile_data['picture']
        post.save()
    replies = Reply.objects.all().filter(user=profile_data['id'])
    if replies:
      for reply in replies:
        reply.userPicture = profile_data['picture']
        reply.save()
    notifications = Notification.objects.all().filter(creator_id=profile_data['id'])
    if notifications:
      for notification in notifications:
        notification.creator_picture = profile_data['picture']
        notification.save()
    return JsonResponse(UserSerializer(user).data, safe=False)
  elif request.method == 'PUT' and ('edit-user' in request.path):
    user_data = JSONParser().parse(request)
    user = User.objects.get(id=user_data['userID'])
    if check_password(user_data['password'], user.password):
      if user_data['newEmail'] != user.email:
        user.email = user_data['newEmail']
      if user_data['newUsername'] != user.username:
        user.username = user_data['newUsername']
        posts = Post.objects.all().filter(user=user_data['userID'])
        if posts:
          for post in posts:
            post.username = user_data['newUsername']
            post.save()
        replies = Reply.objects.all().filter(user=user_data['userID'])
        if replies:
          for reply in replies:
            reply.username = user_data['newUsername']
            reply.save()
        notifications = Notification.objects.all().filter(creator_id=user_data['userID'])
        if notifications:
          for notification in notifications:
            notification.creator_name = user_data['newUsername']
            notification.save()
      user.save()
    return JsonResponse(UserSerializer(user).data, safe=False)
  elif request.method == 'PUT' and ('change-password' in request.path):
    password_data = JSONParser().parse(request)
    user = User.objects.get(id=password_data['userID'])
    if check_password(password_data['currentPassword'], user.password):
      print(password_data['currentPassword'], password_data['newPassword'])
      user.password = make_password(password_data['newPassword'])
      user.save()
      return JsonResponse('password updated', safe=False)
    return JsonResponse('password update failed', safe=False)
  elif request.method == 'DELETE':
    user = User.objects.get(id=user_id)
    user.delete()
    return JsonResponse('deleted a user', safe=False)

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
    elif (request.method == 'GET') and (request.path == '/api/posts/users/'):
      posts = Post.objects.all().filter(username=request.GET['username'])
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
    elif request.method == 'PUT':
      Notification.objects.all().filter(target_id=userID).update(seen=True)
      notifications = Notification.objects.all().filter(target_id=userID)
      return JsonResponse(NotificationSerializer(notifications, many=True).data, safe=False)