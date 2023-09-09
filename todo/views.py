from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from .models import Task

# Create your views here.


def home(request):
    task = Task.objects.filter(is_completed=False).order_by('-updated_at')
    completed_task = Task.objects.filter(
        is_completed=True).order_by('-updated_at')
    context = {
        'task': task,
        'completed_task': completed_task
    }
    return render(request, 'todo/home.html', context)


def addtask(request):
    # if request.method == 'POST':
    newtask = request.POST.get('task')
    task = Task(task=newtask)
    task.save()
    task_dict = {'task': task.task, 'is_completed': task.is_completed,
                 'created_at': task.created_at, 'updated_at': task.updated_at, 'id': task.pk}
    return JsonResponse({'task': task_dict})
    # return redirect('/')


def mark_as_done(request, id):
    task = Task.objects.get(pk=id)
    task = get_object_or_404(Task, pk=id)
    task.is_completed = True
    task.save()
    # serialized_task = serializers.serialize(
    #     'json', [task])  # convert class object to string
    task_dict = {'task': task.task, 'is_completed': task.is_completed,
                 'created_at': task.created_at, 'updated_at': task.updated_at, 'id': task.pk}
    return JsonResponse({'task': task_dict})


def mark_as_undone(request, id):
    task = get_object_or_404(Task, pk=id)
    task.is_completed = False
    task.save()
    task_dict = {'task': task.task, 'is_completed': task.is_completed,
                 'created_at': task.created_at, 'updated_at': task.updated_at, 'id': task.pk}
    return JsonResponse({'task': task_dict})


def edit_task(request, id):
    get_task = get_object_or_404(Task, pk=id)
    if request.method == 'POST':
        get_task.task = request.POST['task']
        get_task.save()
        return redirect('/')
    else:
        return render(request, 'todo/edit_task.html', {'get_task': get_task})


def delete_task(request, id):
    task = get_object_or_404(Task, pk=id)
    task.delete()
    return redirect('/')


def delete_complated_task(request, id):
    task = get_object_or_404(Task, pk=id)
    task.delete()
    return redirect('/')
