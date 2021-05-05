from .views import UserAccountViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('', UserAccountViewSet, basename='user-name')
urlpatterns = router.urls