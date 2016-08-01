from django.apps import AppConfig

from . import __description__, __verbose_name__, __version__

class ExportAppConfig(AppConfig):
    name = 'openslides_export'
    verbose_name = __verbose_name__
    description = __description__
    version = __version__
    angular_site_module = True
    angular_projector_module = False
    js_files = [
        'js/openslides_export/base.js',
        'js/openslides_export/site.js',
        'js/openslides_export/openslides_export-libs.js']

    def ready(self):
        # Add plugin urlpatters to application configuration so OpenSlides
        # can find it.
        from .urls import urlpatterns
        from .signals import openslides_export_add_permission
        from openslides.core.signals import post_permission_creation

        self.urlpatterns = urlpatterns

        # Connect signals.
        post_permission_creation.connect(
            openslides_export_add_permission,
            dispatch_uid='openslides_export_add_permission')
