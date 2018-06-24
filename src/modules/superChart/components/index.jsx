import React, { Component } from 'react'
import { fetchPolygon } from '../../../api'
import { Loader } from 'core/components/Loader'

class SuperChart extends Component {

  state = {
    isLoaded: false,
    polygon: [],
    polygonMaxValues: {
      xMax: 0,
      yMax: 0,
    },
  }


  //метод numberToPixels убрал. использовать строковые литералы напрямую считаю лучшей идеей


  polygonToSVGPoints = polygon => {
    const { xMax, yMax } = this.state.polygonMaxValues
    //верхние точки отодвигаем на 2 процента от верхней границы
    const points = polygon.map(point => `${point[0]},${yMax - point[1] * 0.98}`)
    //добавляем точки (-1,yMax) и ((xMax + 1),yMax) для того, что бы график начинался и заканчивался от нижний границы
    //можно добавить точки (0,yMax) и (xMax,yMax), но тогда появились бы горизотальные линии по бокам графика.
    //так как это не обговорено в тз, оставил на свой выбор для эстетической красоты
    return `-1,${yMax} ${points} ${xMax + 1},${yMax}`
  }

  getPolygonMaxValues = polygon => ({
    //т.к. координата Х в каждой следующей точке увеличивается на 1, начиная с 0, 
    //то xMax - это количество элементов массива. то есть, длина массива - 1
    xMax: polygon.length - 1,
    //yMax - это максимальное значение второй координаты в массиве точек
    yMax: Math.max.apply(Math, polygon.map((elem) => elem[1]))
  })

  calcPolyognSquare = polygon => {
    let area = 0
    const heights = polygon.map((elem) => elem[1])
    for (let i = 1; i < heights.length; i++) {
      //в ТЗ не оговорено, в каких единицах должна быть измерена площадь,
      //так что считаю в точках, в соответствии с входными данными.
      area += (heights[i] + heights[i - 1]) / 2
    }
    return Math.round(area)
  }

  componentDidMount() {
    fetchPolygon().then(
      result => {
        this.setState({
          polygon: result,
          isLoaded: true,
          polygonMaxValues: this.getPolygonMaxValues(result)
        })
      }
    )
  }

  render() {
    const { width, height, scale } = this.props
    const { isLoaded, polygon, polygonMaxValues } = this.state

    return (
      <div
        className='super-chart'
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: `scale(${scale})`
        }}
      >
        <h1>Super Chart</h1>
        {isLoaded
          ? <svg
            width='100%'
            height='100%'
            viewBox={`0 0 ${polygonMaxValues.xMax} ${polygonMaxValues.yMax}`}
            preserveAspectRatio='none'
          >
            <polyline
              points={this.polygonToSVGPoints(polygon)}
              fill='#4E5A7D'
              stroke='#7E91C9'
              strokeWidth='0.5'
            />
          </svg>
          : <Loader.loading size={35} />
        }
        <div className='super-chart__analytics'>
          {isLoaded && <div>max <span className='super-chart__analytics__value'>{polygonMaxValues.yMax}</span></div>}
          {isLoaded && <div>area <span className='super-chart__analytics__value'>{this.calcPolyognSquare(polygon)}</span></div>}
        </div>
      </div>
    )
  }
}

export default SuperChart
