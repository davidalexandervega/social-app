from django.urls import re_path
from app.views import userApi
from app import views

urlpatterns = [
  re_path(r'^users$',views.userApi),
  re_path(r'^users/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}', views.userApi),
  re_path(r'^posts$',views.postApi),
  re_path(r'^posts/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}', views.postApi)
]