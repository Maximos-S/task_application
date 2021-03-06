from .db import db


class List(db.Model):
    __tablename__ = 'lists'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(40), nullable=False, unique=True)
    tasks = db.relationship('Task', backref='list', lazy=True)

    def to_dict(self,):
        return ({
            "id": self.id,
            "title": self.title,
            "tasks": [task.to_dict() for task in self.tasks]
        })

