import React, {Component} from 'react';
import {Input, Row, Col, Select, Button, Card, Table, Pagination} from 'antd';
import styles from './List.less';
import {queryMediaList} from '../../services/api';

const Option = Select.Option;


const queryParam = {
  videoId: '',
  caption: '',
  page: 1,
  limit: 10,
}

const defaultQueryParam = {
  videoId: '',
  caption: '',
}

export default class MediaList extends Component {

  constructor(props) {
    super(props);
    this.state = {

      mediaList: [],

      disableBatchPromoted: true,

      queryParam: {
        videoId: '',
        caption: '',
      },

      pageInfo: {
        currentPage: 1,
        total: 0,
      },

      selectedRowForChange: [],

    }
  }

  componentDidMount() {
    this.queryVideoList();
  }

  // 获取查询条件中的视频ID
  onVideoIdChange = (e) => {
    queryParam.videoId = e.target.value;
    this.setState({queryParam})
  }

  // 获取查询条件中的视频描述
  onCaptionChange = (e) => {
    queryParam.caption = e.target.value;
    this.setState({queryParam})
  }

  handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  // 查询
  queryVideoList = () => {
    console.log("query video list", this.state.queryParam);
    const response = queryMediaList(queryParam);
    response.then(value => {
      if (value !== undefined) {
        const tempPageInfo = {};
        tempPageInfo.currentPage = this.state.currentPage;
        tempPageInfo.total = value.count;
        this.setState(
          {
            mediaList: value.data,
            pageInfo: tempPageInfo,
          });
      }
    })
  }

  // 清除所有查询条件
  cleanAllParam = () => {
    this.setState({queryParam: defaultQueryParam})
  }

  changePageNum = (page, pageSize) => {
    queryParam.page = page;
    this.queryVideoList();
  }

  changePageSize = (cuurent, pageSize) => {
    queryParam.limit = pageSize;
    this.queryVideoList();
  }


  render() {

    const columns = [
      // {
      //   title: 'Seq',
      //   fixed: 'left',
      //   align: 'center',
      //   render: (text, record, index) => {
      //     return (
      //       <div>{index + 1}</div>
      //     );
      //   },
      // },
      {
        title: 'Thumbnail',
        dataIndex: 'file',
        width: 110,
        key: 'file',
        fixed: 'left',
        align: 'center',
        render: (text, record, index) => {
          return (
            <video src={record.file}
                   style={{width: 40}}
                   controls
            />
          );
        },
      },
      {
        title: 'Video ID',
        width: 100,
        dataIndex: 'id',
        key: 'id',
      },
      {title: 'Column 1', dataIndex: 'address', key: '1', width: 150},
      {title: 'Column 2', dataIndex: 'address', key: '2', width: 150},
      {title: 'Column 3', dataIndex: 'address', key: '3', width: 150},
      {title: 'Column 4', dataIndex: 'address', key: '4', width: 150},
      {title: 'Column 5', dataIndex: 'address', key: '5', width: 150},
      {title: 'Column 6', dataIndex: 'address', key: '6', width: 150},
      {title: 'Column 7', dataIndex: 'address', key: '7', width: 150},
      {title: 'Column 8', dataIndex: 'address', key: '8', width: 150},
      {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: () => <a href="javascript:;">action</a>,
      },
    ];


    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        if (selectedRows.length > 0) {
          this.setState({disableBatchPromoted: false});
        } else {
          this.setState({disableBatchPromoted: true});
        }
        this.setState({selectedRowForChange: selectedRows.slice()})
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };

    return (
      <div>
        <Row type="flex" justify="space-around" align="middle" className={styles.row_style}>
          <Col span={2} className={styles.label}>
            <div>Video ID</div>
          </Col>
          <Col span={4} className={styles.value}>
            <Input
              className={styles.width_full}
              value={this.state.queryParam.videoId}
              onChange={this.onVideoIdChange}
            />
          </Col>
          <Col span={2} className={styles.label}>
            <div>Caption</div>
          </Col>
          <Col span={4} className={styles.value}>
            <Input
              className={styles.width_full}
              value={this.state.videoId}
              onChange={this.onCaptionChange}
            />
          </Col>
          <Col span={2} className={styles.label}>
            <div>Source</div>
          </Col>
          <Col span={4} className={styles.value}>
            <Select
              className={styles.width_full}
              showSearch
              placeholder="Select a Source"
              optionFilterProp="children"
              defaultValue=""
              onChange={this.handleChange}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option value="">ALL</Option>
              <Option value="4">Manually Uploaded</Option>
              <Option value="3">musical.ly</Option>
              <Option value="1">Tik Tok</Option>
              <Option value="2">Kwai</Option>
            </Select>
          </Col>
          <Col span={2} className={styles.label}>
            <div>Owner Group</div>
          </Col>
          <Col span={4} className={styles.value}>
            <Select
              className={styles.width_full}
              showSearch
              placeholder="Select a Source"
              optionFilterProp="children"
              defaultValue=""
              onChange={this.handleChange}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option value="">ALL</Option>
              <Option value="4">Manually Uploaded</Option>
              <Option value="3">musical.ly</Option>
              <Option value="1">Tik Tok</Option>
              <Option value="2">Kwai</Option>
            </Select>
          </Col>
        </Row>


        <Row type="flex" justify="space-around" align="middle" className={styles.row_style}>
          <Col span={2} className={styles.label}>
            <div>Owner</div>
          </Col>
          <Col span={4} className={styles.value}>
            <Input
              className={styles.width_full}
              value={this.state.videoId}
              onChange={this.onVideoIdChange}
            />
          </Col>
          <Col span={2} className={styles.label}>
            <div>Visible</div>
          </Col>
          <Col span={4} className={styles.value}>
            <Select
              className={styles.width_full}
              showSearch
              placeholder="Select a Source"
              optionFilterProp="children"
              defaultValue=""
              onChange={this.handleChange}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option value="">ALL</Option>
              <Option value="4">Manually Uploaded</Option>
              <Option value="3">musical.ly</Option>
              <Option value="1">Tik Tok</Option>
              <Option value="2">Kwai</Option>
            </Select>
          </Col>
          <Col span={2} className={styles.label}>
            <div>Promoted</div>
          </Col>
          <Col span={4} className={styles.value}>
            <Select
              className={styles.width_full}
              showSearch
              placeholder="Select a Source"
              optionFilterProp="children"
              defaultValue=""
              onChange={this.handleChange}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option value="">ALL</Option>
              <Option value="4">Manually Uploaded</Option>
              <Option value="3">musical.ly</Option>
              <Option value="1">Tik Tok</Option>
              <Option value="2">Kwai</Option>
            </Select>
          </Col>
          <Col span={2} className={styles.label}>
            <div>Last Editor</div>
          </Col>
          <Col span={4} className={styles.value}>
            <Select
              className={styles.width_full}
              showSearch
              placeholder="Select a Source"
              optionFilterProp="children"
              defaultValue=""
              onChange={this.handleChange}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option value="">ALL</Option>
              <Option value="4">Manually Uploaded</Option>
              <Option value="3">musical.ly</Option>
              <Option value="1">Tik Tok</Option>
              <Option value="2">Kwai</Option>
            </Select>
          </Col>
        </Row>

        <Row type="flex" justify="space-around" align="middle" className={styles.row_style}>
          <Col span={2} className={styles.label}>
            <div>Last Edit Date (IST)</div>
          </Col>
          <Col span={4} className={styles.value}>
            <Input
              className={styles.width_full}
              value={this.state.videoId}
              onChange={this.onVideoIdChange}
            />
          </Col>
          <Col span={2} className={styles.label}>
            <div>Upload Date (IST)</div>
          </Col>
          <Col span={4} className={styles.value}>
            <Select
              className={styles.width_full}
              showSearch
              placeholder="Select a Source"
              optionFilterProp="children"
              defaultValue=""
              onChange={this.handleChange}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option value="">ALL</Option>
              <Option value="4">Manually Uploaded</Option>
              <Option value="3">musical.ly</Option>
              <Option value="1">Tik Tok</Option>
              <Option value="2">Kwai</Option>
            </Select>
          </Col>
          <Col span={12} className={styles.button_style}>
            <Button
              type="primary"
              style={{marginRight: 10}}
              onClick={this.queryVideoList}
            >
              Search
            </Button>
            <Button
              onClick={this.cleanAllParam}
            >
              ClearAll
            </Button>
          </Col>
        </Row>
        <Button
          disabled={this.state.disableBatchPromoted}
          type="primary"
          style={{marginBottom: 5}}
        >
          Set selected promoted on
        </Button>
        <Table
          pagination={false}
          columns={columns}
          dataSource={this.state.mediaList}
          scroll={{x: 1500, y: 400}}
          rowSelection={rowSelection}
        />
        <Pagination
          style={{marginTop: 5}}
          showTotal={(total, range) => {
            return (<div>Total Media: {total}</div>);
          }}
          showQuickJumper
          showSizeChanger
          defaultCurrent={this.state.pageInfo.currentPage}
          total={this.state.pageInfo.total}
          onChange={this.changePageNum}
          onShowSizeChange={this.changePageSize}
        />
      </div>
    );
  }

}





