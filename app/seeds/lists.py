from app.models import db, List

# Adds a demo user, you can add other users here if you want


def seed_lists():

    daily = List(title='Daily')
    weekly = List(title='Weekly')
    monthly = List(title='Monthly')

    db.session.add(daily)
    db.session.add(weekly)
    db.session.add(monthly)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_lists():
    db.session.execute('TRUNCATE lists;')
    db.session.commit()
