from .views import AssesmentListViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('', AssesmentListViewSet, basename='assesment_list')
urlpatterns = router.urls