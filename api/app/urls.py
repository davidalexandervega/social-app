from django.urls import re_path, path
from app import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
  path('api/token/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
  # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  re_path(r'api/users/.*', views.userApi),
  # re_path(r'^api/users/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}', views.userApi),
  # path('api/posts/', views.postApi),
  re_path(r'^api/posts/.*', views.postApi),
  re_path(r'^api/replies/.*', views.replyApi),
  re_path(r'^api/notifications/.*', views.notificationApi)
]