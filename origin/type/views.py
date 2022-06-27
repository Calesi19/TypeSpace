from django.http import HttpResponse
from django.shortcuts import render
from type.models import WordBank

def index(request):
    all_words = WordBank.objects.all()
    data = {"words" : all_words}
    return render(request, 'index.html', data)  