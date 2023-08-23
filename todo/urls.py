from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('addtask/', views.addtask, name='addtask'),
    path('mark-as-done/<int:id>', views.mark_as_done, name='mark-as-done'),
    path('mark-as-undone/<int:id>', views.mark_as_undone, name='mark-as-undone'),
]
