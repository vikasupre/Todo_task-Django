from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
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
    newtask = request.POST['task']
    Task.objects.create(task=newtask)
    return redirect('/')


def mark_as_done(request, id):
    # task = Task.objects.get(pk=id)
    task = get_object_or_404(Task, pk=id)
    task.is_completed = True
    task.save()
    return redirect('/')


def mark_as_undone(request, id):
    task = get_object_or_404(Task, pk=id)
    task.is_completed = False
    task.save()
    return redirect('/')
