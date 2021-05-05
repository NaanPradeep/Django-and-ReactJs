from rest_framework import serializers
from .models import (
    Assesment,
    AssesmentPerformance,
    Question
)
from users.models import UserAccounts

class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class QuestionSerializer(serializers.ModelSerializer):
    choices = StringSerializer(many=True)
    class Meta:
        model = Question
        fields = ('id', 'question', 'choices', 'question_number')


class AssesmentSerializer(serializers.ModelSerializer):
    questions = serializers.SerializerMethodField(method_name='get_questions')

    class Meta:
        model = Assesment
        fields = ('__all__')

    def get_questions(self, instance):
        questions = QuestionSerializer(instance.questions.all(), many=True).data
        return questions


class AssessmentPerformanceSerializer(serializers.ModelSerializer):
    
    assessment_subject = serializers.ReadOnlyField(source='assignment.subject')
    assessment_topic = serializers.ReadOnlyField(source='assignment.topic')

    class Meta:
        model = AssesmentPerformance
        fields = ('__all__')

    def create(self, request):
        data = request.data

        assessment = Assesment.objects.get(id=data['assignment'])
        user = UserAccounts.objects.get(email=data['user'])

        assessmentPerformance = AssesmentPerformance()
        assessmentPerformance.assignment = assessment
        assessmentPerformance.time_taken = data['time_taken']
        assessmentPerformance.user = user

        questions = [question for question in assessment.questions.all()]
        answers = [data['answers'][key] for key in data['answers']]

        no_of_questions = len(questions)
        answered_correct_count = 0

        for i in range(no_of_questions):
            print(questions[i].answer.choice)
            if str(questions[i].answer.choice) == answers[i]:
                answered_correct_count += 1
            
        score = (answered_correct_count / no_of_questions) * 100
        assessmentPerformance.score = score
        assessmentPerformance.save()
        return assessmentPerformance