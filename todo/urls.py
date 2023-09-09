from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('addtask/', views.addtask, name='addtask'),
    path('mark-as-done/<int:id>', views.mark_as_done, name='mark_as_done'),
    path('mark-as-undone/<int:id>', views.mark_as_undone, name='mark_as_undone'),
    path('edit-task/<int:id>', views.edit_task, name='edit-task'),
    path('delete-task/<int:id>', views.delete_task, name='delete-task'),
    path('delete-complated-task/<int:id>',
         views.delete_complated_task, name='delete-complated-task'),
]
