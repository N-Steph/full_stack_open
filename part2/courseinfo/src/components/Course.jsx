const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => (
  <div>
    {props.parts.map(part => <Part key={part.id} part={part}/>)} 
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => <p>total of {props.total} exercises</p>

const Course = (props) => {
  const coursesList = props.courses.map(course => {
        const exercises = course.parts.map(part => part.exercises)
        const total = exercises.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        return (
          <div key={course.id}>
            <Header course={course.name}/>
            <Content parts={course.parts} />
            <Total total={total} />
          </div>
        
        )
      }
    )

  return (
    <div>{coursesList}</div>
  )
}

export default Course