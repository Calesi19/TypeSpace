from django.urls import path

from . import views
app_name = 'type'
urlpatterns = [
    path('', views.index, name='index'),
]