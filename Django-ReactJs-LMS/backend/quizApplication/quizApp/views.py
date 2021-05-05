from rest_framework import viewsets
from django.core import serializers
from .models import Assesment, Question, AssesmentPerformance, Choices 
from rest_framework.generics import ListAPIView, CreateAPIView
from django.views.generic.list import ListView
from rest_framework.response import Response
from .serializers import AssesmentSerializer, AssessmentPerformanceSerializer
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from django.http import JsonResponse, HttpResponse


class AssesmentListViewSet(viewsets.ModelViewSet):
    serializer_class = AssesmentSerializer
    queryset = Assesment.objects.all()


class StudentPerformanceListView(ListAPIView):
    serializer_class = AssessmentPerformanceSerializer

    def get_queryset(self):
        queryset = AssesmentPerformance.objects.all()
        email = self.request.query_params.get('email', None)

        if email is not None:
            queryset = queryset.filter(user__email=email)
        return queryset


class StudentPerformanceCreateView(CreateAPIView):
    serializer_class = AssessmentPerformanceSerializer
    queryset = AssesmentPerformance.objects.all()

    def post(self, request):
        serializer = AssessmentPerformanceSerializer(data=request.data)
        serializer.is_valid()
        grade_assessment = serializer.create(request)
        if grade_assessment:
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)