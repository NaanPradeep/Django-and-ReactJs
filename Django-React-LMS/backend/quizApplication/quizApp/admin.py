from django.contrib import admin
from .models import Assesment, Question, AssesmentPerformance, Choices 

admin.site.register(Assesment)
admin.site.register(AssesmentPerformance)
admin.site.register(Question)
admin.site.register(Choices)