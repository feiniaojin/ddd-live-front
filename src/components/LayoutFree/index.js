
import React from "react";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import Thumbnails, { Thumbnail } from '@antv/thumbnails';

const ReactGridLayout = WidthProvider(RGL);
const chartTypeList = Object.keys(Thumbnails);
class LayoutFree extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    items: 20,
    cols: 12,
    rowHeight: 30,
    onLayoutChange: function () { },
    // This turns off compaction so you can place items wherever.
    verticalCompact: false
  };

  constructor(props) {
    super(props);

    const layout = this.generateLayout();
    this.state = { layout: [...layout] };
  }

  generateDOM() {
    return this.state.layout.map(function (area) {
      const view = <Thumbnail chart={area.type} width={'100%'} height='80%' />
      return (
        <div key={area.i}
          // style={{background:'#dee0e3',width:'100%',height:'100%'}} 
          style={{ background: '#' + Math.floor(Math.random() * 16777215).toString(16), width: '100%', height: '100%' }}
        >{area.type}
          {view}


        </div>
      );
    });
  }

  generateLayout() {
    const p = this.props;
    const availableHandles = ["s", "w", "e", "n", "sw", "nw", "se", "ne"];
    return _.map(new Array(p.items), function (item, i) {
      const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
      return {
        x: (i * 2) % 12,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: y,
        i: i.toString(),
        type: chartTypeList[i],
        // resizeHandles: _.shuffle(availableHandles).slice(0, _.random(1, availableHandles.length-1)),
        resizeHandles: availableHandles,

      };
    });
  }

  onLayoutChange = (layout, layouts) => {
    this.props.onLayoutChange(layout, layouts);
  };

  handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
  };




  render() {
    console.log('layout', this.state.layout)
    return (
      <div style={{ width: '100%' }}>

        <ReactGridLayout
          style={{ width: '100%' }}
          layout={this.state.layout}
          onLayoutChange={this.onLayoutChange}
          {...this.props}
          isDroppable={true}
          measureBeforeMount={false}

        >
          {this.generateDOM()}
        </ReactGridLayout>

      </div>
    );
  }
}

export default LayoutFree;
