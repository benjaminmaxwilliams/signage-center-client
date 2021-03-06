import React from "react";
import {Modal, Table} from "antd";
import "./PlaylistSlideOrderForm.css";
import PropTypes from "prop-types";
import {DragDropContext, DragSource, DropTarget} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import FormattedDuration from "react-intl-formatted-duration";
import {FormattedMessage} from "react-intl";
import messages from "./messages";


function dragDirection(
    dragIndex,
    hoverIndex,
    initialClientOffset,
    clientOffset,
    sourceClientOffset,
) {
    const hoverMiddleY = (initialClientOffset.y - sourceClientOffset.y) / 2;
    const hoverClientY = clientOffset.y - sourceClientOffset.y;
    if (dragIndex < hoverIndex && hoverClientY > hoverMiddleY) {
        return 'downward';
    }
    if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
        return 'upward';
    }
}

class BodyRow extends React.Component {
    render() {
        const {
            isOver,
            connectDragSource,
            connectDropTarget,
            moveRow,
            dragRow,
            clientOffset,
            sourceClientOffset,
            initialClientOffset,
            ...restProps
        } = this.props;
        const style = {...restProps.style, cursor: 'move'};

        let className = restProps.className;
        if (isOver && initialClientOffset) {
            const direction = dragDirection(
                dragRow.index,
                restProps.index,
                initialClientOffset,
                clientOffset,
                sourceClientOffset
            );
            if (direction === 'downward') {
                className += ' drop-over-downward';
            }
            if (direction === 'upward') {
                className += ' drop-over-upward';
            }
        }

        return connectDragSource(
            connectDropTarget(
                <tr
                    {...restProps}
                    className={className}
                    style={style}
                />
            )
        );
    }
}

const rowSource = {
    beginDrag(props) {
        return {
            index: props.index,
        };
    },
};

const rowTarget = {
    drop(props, monitor) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Time to actually perform the action
        props.moveRow(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    },
};

const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    sourceClientOffset: monitor.getSourceClientOffset(),
}))(
    DragSource('row', rowSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        dragRow: monitor.getItem(),
        clientOffset: monitor.getClientOffset(),
        initialClientOffset: monitor.getInitialClientOffset(),
    }))(BodyRow)
);

class PlaylistSlideOrderForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            slides: this.props.slides,
            isLoading: false
        };

        this.components = {
            body: {
                row: DragableBodyRow,
            },
        };

        this.onCreate = this.onCreate.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.moveRow = this.moveRow.bind(this);
    }

    componentWillReceiveProps(props) {
        const {slides} = this.state;

        if (!!slides) {
            this.setState({slides: props.slides})
        }
    }

    moveRow = (dragIndex, hoverIndex) => {
        const {slides} = this.state;
        const dragRow = slides[dragIndex];

        this.setState(
            update(this.state, {
                slides: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
                },
            }),
        );
    };

    onCreate = (e) => {
        e.preventDefault();
        this.setState({isLoading: true});
    };

    generateFormData = () => {

    };

    onCancel = () => {
        this.props.onCancel();
    };

    render() {
        const {visible} = this.props;
        const {isLoading, slides} = this.state;

        const columns = [
            {
                title: <FormattedMessage {...messages.nameColumn} />,
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: <FormattedMessage {...messages.durationColumn} />,
                dataIndex: 'duration',
                key: 'duration',
                render: (text) => <FormattedDuration seconds={text} textComponent={(props) => <span {...props} />}/>
            },
        ];


        return (
            <Modal
                visible={visible}
                title={<FormattedMessage {...messages.title} />}
                okText={<FormattedMessage {...messages.submit} />}
                width={620}
                confirmLoading={isLoading}
                onCancel={this.onCancel}
                onOk={this.onCreate}>
                <Table
                    rowKey="id"
                    pagination={false}
                    columns={columns}
                    dataSource={slides}
                    components={this.components}
                    onRow={(record, index) => ({
                        index,
                        moveRow: this.moveRow,
                    })}
                />
            </Modal>
        );
    }
}

PlaylistSlideOrderForm.propTypes = {
    slides: PropTypes.array.isRequired,
    visible: PropTypes.bool,
    onSuccess: PropTypes.func,
    onCancel: PropTypes.func,
};

export default PlaylistSlideOrderForm = DragDropContext(HTML5Backend)(PlaylistSlideOrderForm);

