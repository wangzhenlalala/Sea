#ifndef TODOMODEL_H
#define TODOMODEL_H

#include <QtCore>
#include <QtGui>

class TodoModel: public QAbstractListModel
{
    Q_OBJECT
    Q_PROPERTY(int count READ count NOTIFY countChanged);
public:
    // we would declare them as public slots
    Q_INVOKABLE bool insert(int index, const QString data);
    Q_INVOKABLE bool append(const QString& data);
    Q_INVOKABLE bool remove(const int& index);
    Q_INVOKABLE bool clear();

    Q_INVOKABLE QVariant get(const int index);


    explicit TodoModel(QObject* parent = nullptr);
    ~TodoModel();

    enum RoleNames {
        DoneRole = Qt::UserRole,
        DescRole,
    };

    int count() const;

    virtual int rowCount(const QModelIndex& parent) const override;
    virtual QVariant data(const QModelIndex& index, int role) const override;

signals:
    void countChanged(int count);

protected:
    virtual QHash<int, QByteArray> roleNames() const override;

private:
    QHash<int, QByteArray> m_roleNames;
    QList<QColor> m_data;
};

#endif // TODOMODEL_H
