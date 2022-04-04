import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import Spinner from "../common/Spinner";
// handling redirects
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false
  };

  componentDidMount() {
    const { courses, authors, actions } = this.props;
    // if statement is for it to only load the courses and authors once
    if (courses.length === 0) {
      actions.loadCourses().catch(error => {
        alert("Loading courses failed" + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }

  // handleDeleteCourse = (course) => {
  //   toast.success("Course Deleted");
  //   this.props.actions.deleteCourse(course).catch(error => {
  //     toast.error("Delete Failed " + error.message, {autoClose: false})
  //   });
  // };
  // async/await version of above
  handleDeleteCourse = async (course) => {
    toast.success("Course Deleted");
    try {
      await this.props.actions.deleteCourse(course);
    }  catch (error)  {
      toast.error("Delete Failed " + error.message, {autoClose: false})
    }
  };

  render() {
    return (
      <>
        {/* if value and state is true it will redirect to course page.
          This is a Jave script logic "&&" operator where right hand side will only evaluate
          if left hand side is true. */}
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        {/* button for adding course which redirects to course page */ }
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            > 
              Add Course
            </button>

              <CourseList
                onDeleteClick={this.handleDeleteCourse}
                courses={this.props.courses}
              />
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

// if there is no author, it will return an empty array
// if there is an author, it will look for the corresponding author of the ID.
function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(a => a.id === course.authorId).name
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);

// class CoursesPage extends React.Component {
//     // editing and adding courses will be placed on a separate page
//     // state = {
//     //     course: {
//     //         title: ""
//     //     }
//     // };
//     // handleChange = event => {
//     //     let course = {...this.state.course, title: event.target.value};
//     //     this.setState({course: course});
//     // }
//     // handleSubmit = event => {
//     //     event.preventDefault();
//     //     this.props.actions.createCourse(this.state.course);
//     // };
//     componentDidMount() {
//         this.props.actions.loadCourses().catch(error => {
//             alert("Loading courses failed" + error);
//         });
//     }
    
//     render() {
//         return (
//             <>
//                 <h2>Courses</h2>
//                 {this.props.courses.map(courses => (
//                     <div key = {courses.title}>{courses.title}</div>
//                 ))}
//             </>
//         );
//     }
// }

// CoursesPage.propTypes = {
//     courses: PropTypes.array.isRequired,
//     actions: PropTypes.object.isRequired
// };

// function mapStateToProps (state) {
//     return {
//         courses: state.courses
//     };
// }

// function mapDispatchToProps (dispatch) {
//     return {
//         actions: bindActionCreators(courseActions, dispatch)
//     };
// }

// //Courses Page is decorated using function connect
// //Connect function calls the function below and that function calls the component 'CoursesPage'
// export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);

// //long version of above
// //const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
// //export default connectedStateProps(CoursesPage);