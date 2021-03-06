import PropTypes from 'prop-types'

const ProgressBar = ({percentage}) => {
    return (
        <div className="progress">
            <div 
                className="progress-bar progress-bar-striped" 
                role="progressbar" 
                style={{width: `${percentage}%`}}
                >
             {percentage}%
            </div>
        </div>
    )
}

ProgressBar.propTypes = {
    percentage: PropTypes.number.isRequired
}

export default ProgressBar
