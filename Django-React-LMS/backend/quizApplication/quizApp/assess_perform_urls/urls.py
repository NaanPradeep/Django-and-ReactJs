from django.urls import path
from quizApp.views import StudentPerformanceCreateView, StudentPerformanceListView

urlpatterns = [
    path('', StudentPerformanceListView.as_view()),
    path('create-new/', StudentPerformanceCreateView.as_view()),
]