from django.urls import re_path, path
from app.views import userApi
from app import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
  path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path('api/users/', views.userApi),
  # re_path(r'^api/users/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}', views.userApi),
  # path('api/posts/', views.postApi),
  re_path(r'^api/posts/.*', views.postApi)
]