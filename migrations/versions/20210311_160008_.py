"""empty message

Revision ID: b8ed526dd64f
Revises: 
Create Date: 2021-03-11 16:00:08.197217

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b8ed526dd64f'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('lists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=40), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('title')
    )
    op.create_table('tasks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=40), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=False),
    sa.Column('status', sa.Boolean(), nullable=True),
    sa.Column('listId', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['listId'], ['lists.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('content', sa.String(length=255), nullable=False),
    sa.Column('taskId', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['taskId'], ['tasks.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('comments')
    op.drop_table('tasks')
    op.drop_table('lists')
    # ### end Alembic commands ###
