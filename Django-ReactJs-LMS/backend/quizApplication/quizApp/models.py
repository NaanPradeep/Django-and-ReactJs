from django.db import models
from django.conf import settings


class Assesment(models.Model):
	subject = models.CharField(max_length=100)
	topic = models.CharField(max_length=100)
	number_of_questions = models.IntegerField()
	duration = models.CharField(help_text='Duration of quiz in minutes', max_length=50)

	def __str__(self):
		return f"Subject: {self.subject} , Topic: {self.topic}"


class AssesmentPerformance(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user')
	assignment = models.ForeignKey(Assesment, on_delete=models.SET_NULL, blank=True, null=True, related_name='assessment')
	score = models.FloatField(blank=True, null=True)
	time_taken = models.CharField(max_length=50, blank=True, null=True)


	def __str__(self):
		return self.user.email


class Choices(models.Model):
	choice = models.CharField(max_length=100)

	def __str__(self):
		return self.choice

 
class Question(models.Model):
	question_number = models.SmallIntegerField()
	question = models.CharField(max_length=500)
	choices = models.ManyToManyField(Choices)
	answer = models.ForeignKey(Choices, on_delete=models.CASCADE, related_name='answer')
	assignment = models.ForeignKey(Assesment, on_delete=models.CASCADE, related_name='questions')


	def __str__(self):
		return self.question