from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from app.models import User, Post
from app.serializers import UserSerializer, PostSerializer

# Create your views here.

@csrf_exempt
def userApi(request, user_id=0):
  if request.method == 'GET':
    user = User.objects.get(id=user_id)
    user_serializer = UserSerializer(user)
    return JsonResponse(user_serializer.data, safe=False)
  elif request.method == 'POST':
    user_data = JSONParser().parse(request)
    user_serializer = UserSerializer(data=user_data)
    if user_serializer.is_valid():
      user_serializer.save()
      return JsonResponse('created a user', safe=False)
    return JsonResponse('failed to create a user', safe=False)
  elif request.method == 'PUT':
    user_data = JSONParser().parse(request)
    user = User.objects.get(id=user_data['id'])
    user_serializer = UserSerializer(user, data=user_data)
    if user_serializer.is_valid():
      user_serializer.save()
      return JsonResponse('updated a user', safe=False)
    return JsonResponse('failed to update a user', safe=False)
  elif request.method == 'DELETE':
    user = User.objects.get(id=user_id)
    user.delete()
    return JsonResponse('deleted a user')

@csrf_exempt
def postApi(request, post_id=0):
  if request.method == 'GET':
    post = Post.objects.get(id=post_id)
    post_serializer = PostSerializer(post)
    return JsonResponse(post_serializer.data, safe=False)
  elif request.method == 'POST':
    post_data = JSONParser().parse(request)
    post_serializer = PostSerializer(data=post_data)
    if post_serializer.is_valid():
      post_serializer.save()
      return JsonResponse('created a post', safe=False)
    return JsonResponse('failed to create a post', safe=False)
  elif request.method == 'DELETE':
    post = Post.objects.get(id=post_id)
    post.delete()
    return JsonResponse('deleted a post')