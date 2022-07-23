from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework_simplejwt.authentication import JWTAuthentication
JWT_authenticator = JWTAuthentication()

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
    if user_serializer.is_valid(raise_exception=True):
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
  response = JWT_authenticator.authenticate(request)
  if response is not None:
    username , token = response
    userID = token.payload['user_id']
    print("token.payload:", token.payload)
    if (request.method == 'GET') and (request.path == '/api/posts/all'):
      posts = Post.objects.all()
      return JsonResponse(PostSerializer(posts, many=True).data, safe=False)
    elif (request.method == 'GET') and (request.path == '/api/posts/user'):
      posts = Post.objects.get(user=userID)
      return JsonResponse(PostSerializer(posts, many=True).data, safe=False)
    elif (request.method == 'GET') and (request.path == '/api/posts/post'):
      post = Post.objects.get(id='post')
      if post:
        return JsonResponse(PostSerializer(post).data, safe=False)
      return JsonResponse('post not found', safe=False)
    elif request.method == 'POST':
      post_data = JSONParser().parse(request)
      post_data['user'] = userID
      post_serializer = PostSerializer(data=post_data)
      # print(post_serializer.is_valid())
      # print(post_serializer.errors)
      if post_serializer.is_valid():
        post_serializer.save()
        return JsonResponse(post_data, safe=False)
      return JsonResponse('failed to create a post', safe=False)
    elif (request.method == 'PUT') and ('like' in request.path):
      post_data = JSONParser().parse(request)
      post = Post.objects.get(id=post_data['id'])
      post_serializer = PostSerializer(post, data=post_data)
      if post_serializer.is_valid():
        post_serializer.save()
        return JsonResponse(post_data, safe=False)
      return JsonResponse('failed to like a post', safe=False)
    elif request.method == 'DELETE':
      post = Post.objects.get(id=post_id)
      if post['user'] == userID:
        post.delete()
        return JsonResponse('deleted a post')
      return JsonResponse('failed to delete a post', safe=False)
  else:
    return JsonResponse('no token is present in the header, or no header', safe=False)