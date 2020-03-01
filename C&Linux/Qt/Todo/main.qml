import QtQuick 2.12
import QtQuick.Window 2.12
import QtQuick.Controls 2.0
import QtQuick.Layouts 1.2

import Todo 1.0

Window {
    visible: true
    width: 640
    height: 480
    title: qsTr("Hello World")

    Rectangle {
        anchors.fill: parent
        anchors.margins: 20

        ListView {
            anchors.fill: parent
            clip: true

            model: TodoModel{}

            delegate: RowLayout {
                width: parent.width
                CheckBox{
                    checked: model.done
                    onCheckedChanged: {
                        model.done = checked;
                    }
                }
                TextField {
                    Layout.fillWidth: true
                    text: model.desc
                    color: 'purple'
                    onEditingFinished: {
                        model.desc = text;
                    }
                }
            }
        }
    }
}
