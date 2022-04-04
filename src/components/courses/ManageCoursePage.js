// with React class snippet extension installed, we just type "rcc"

// Courses Page was copied for this js file

// This is divided to 5 sections:

// Section 1: imports
// contains the core libraries we need for any container component
import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import {loadAuthors} from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import { toast } from "react-toastify";

// // Section 2: components
// // class component declaration
// class ManageCoursePage extends React.Component {
//   componentDidMount() {
//     const { courses, authors, loadAuthors, loadCourses} = this.props;
//     if (courses.length === 0) {
//       loadCourses().catch(error => {
//         alert("Loading courses failed" + error);
//       });
//     }

//     if (authors.length === 0) {
//       loadAuthors().catch(error => {
//         alert("Loading authors failed" + error);
//       });
//     }
//   }

//   render() {
//     return (
//       <>
//         <h2>Manage Course</h2>
//       </>
//     );
//   }
// }

// converting class component to function component for hooks
// function components are preferred as it easier to maintain and declare
// ...props means "assign any props I havent destructured on the left to a variavle called props"
function ManageCoursePage({ courses, authors, loadAuthors, loadCourses, saveCourse, history, ...props }) {
    const [course, setCourse] = useState({ ...props.course });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    
    useEffect(() => {    
        if (courses.length === 0) {
            loadCourses().catch(error => {
                alert("Loading courses failed" + error);
            });
        } else {
            setCourse({ ...props.course });
        }

        if (authors.length === 0) {
            loadAuthors().catch(error => {
                alert("Loading authors failed" + error);
            });
        }
    }, [props.course]);
    // empty array as a second argument to effect means the effect will only run once when the component mounts
    // this is effectively the same as componentDidMount.
    
    function handleChange(event) {
        const { name, value } = event.target;
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: name === "authorId" ? parseInt(value, 10) : value
        }));
    }

    function formIsValid() {
        const { title, authorId, category } = course;
        const errors = {};

        if (!title) errors.title = "Title is Required.";
        if (!authorId) errors.author = "Author is Required.";
        if (!category) errors.category = "Category is Required.";

        setErrors(errors);
        // Form is valid if the object still has no properties
        // This returns an array of object properties
        return Object.keys(errors).length === 0;
    }
    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        // .then is used to chain a new action to return user to courses page after hiting save
        saveCourse(course).then(() => {
            toast.success("Course Saved");
            history.push("/courses");
        }).catch(error => {
            setSaving(false);
            setErrors({ onSave: error.message });
        });
    }

    return (
        <CourseForm
            course={course}
            errors={errors}
            authors={authors}
            onChange={handleChange}
            onSave={handleSave}
            saving={saving}
        />
    );
}

// selector function as it selects data from redux store
export function getCourseBySlug(courses, slug) {
    // java find function to look for the parameters of course, if not found, it will return nothing.
    return courses.find(course => course.slug === slug) || null;
}
// Section 3: proptypes
// proptypes declarations
ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired,
    // history is any component loaded via <Route> gets history passed in on props from react Router
    history: PropTypes.object.isRequired
};

// Section 4: Redux Mapping Function
// redux mapping functions that determine what state and action, we would like to access
// in our component.
function mapStateToProps(state, ownProps) {
    const slug = ownProps.match.params.slug;
    const course =
        slug && state.courses.length > 0
            ? getCourseBySlug(state.courses, slug)
            : newCourse;
    return {
        course,
        courses: state.courses,
        authors: state.authors
    };
}

// // using object function to simplify this code:
// function mapDispatchToProps(dispatch) {
//   return {
//     actions: {
//       loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
//       loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
//     }
//   };
// }
// // by declaring it as an object, each property will automatically be bound to dispatch.

const mapDispatchToProps = {
    loadCourses,
    loadAuthors,
    saveCourse
};
  // now we add loadCourses, and loadAuthors to componentDidMount


// Section 5: Export (redux connect)
// the call to connect which connects the component to redux.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);