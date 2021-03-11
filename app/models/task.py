from .db import db


class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(40), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    status = db.Column(db.Boolean, default=False)
    listId = db.Column(db.Integer, db.ForeignKey('lists.id'))
    comments = db.relationship("Comment", backref="task", lazy=True)

    def to_dict(self):
        return ({
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "status": self.status,
            "comments": [comment.to_dict() for comment in self.comments]
        })
