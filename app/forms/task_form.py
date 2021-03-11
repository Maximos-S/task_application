from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError

class TaskForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    status = BooleanField('status', validators=[DataRequired()])
    list_id = IntegerField('list_id', validators=[DataRequired()])
