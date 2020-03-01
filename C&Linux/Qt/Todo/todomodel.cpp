#include "todomodel.h"

bool TodoModel::insert(int index, const QString data)
{
    if(index < 0 || index >= m_data.count())
        return false;
    emit beginInsertRows(QModelIndex(), index, index);
    m_data.insert(index, data);
    emit endInsertRows();
    emit countChanged(m_data.count());
    return true;
};

bool TodoModel::append(const QString& data)
{
    insert(m_data.count(), data);
    return true;
};

bool TodoModel::remove(const int& index)
{
    if( index < 0 || index >= m_data.count())
        return false;
    emit beginRemoveRows(QModelIndex(), index, index);
    m_data.removeAt(index);
    emit endRemoveRows();
    emit countChanged(m_data.count());
    return true;
}

bool TodoModel::clear()
{
    return true;
}

QVariant TodoModel::get(const int index)
{
    if(index < 0 || index >= m_data.count() )
        return QVariant();
    return m_data.at(index);
}


TodoModel::TodoModel(QObject* parent)
    :QAbstractListModel(parent)
{
    m_roleNames[DoneRole] = "done";
    m_roleNames[DescRole] = "desc";

    for(const QColor& name: QColor::colorNames())
    {
        m_data.append(QColor(name));
    }
};

TodoModel::~TodoModel()
{

}

int TodoModel::rowCount(const QModelIndex& parent) const
{
    Q_UNUSED(parent);
    return m_data.count();
}


QVariant TodoModel::data(const QModelIndex& index, int role) const
{
   if(!index.isValid())
        return QVariant();

   int row = index.row();
   if(row < 0 || row >= m_data.count())
       return QVariant();

   const QColor& color = m_data.at(row);
   switch(role)
   {
        case DoneRole:
            return color.name();
        case DescRole:
            return color.name();
   }
   return QVariant();
}

QHash<int, QByteArray> TodoModel::roleNames() const
{
    return m_roleNames;
}

