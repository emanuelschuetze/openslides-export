from django.db import models


class Export(models.Model):
    """
    The (empty) export model for define export permission.
    """

    class Meta:
        default_permissions = ()
        permissions = (('can_export', 'Can export data'),)
