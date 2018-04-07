/**
 *
 * ManagerCreatePage
 *
 */

/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { repeat, forEach } from 'lodash';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import MediumEditor from 'medium-editor';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import Manager from 'components/Manager';
import Form, { InputGroup, SelectGroup } from 'components/Form';
import Button from 'components/Button';
import Uploader from 'components/Uploader';
import ImageIcon from 'components/ImageIcon';

import { loadSlides as loadSlidesAction } from 'containers/App/actions';
import { makeSelectSlidesIsLoading, makeSelectSlidesIsLoaded, makeSelectSlidesTree } from 'containers/App/selectors';

import { changeTitleAction, changeInternalIdentAction, changeParentAction, submit, changeIconAction, changeContentAction } from './actions';

import makeSelectManagerCreatePage from './selectors';
import reducer from './reducer';
import messages from './messages';
import saga from './saga';

export class ManagerCreatePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.selectOptions = [];
    this.contentEditor = undefined;
  }

  componentWillMount() {
    const { isLoaded, isLoading, loadSlides, slidesTree } = this.props;

    if (!isLoaded && !isLoading) {
      loadSlides();
    } else {
      this.generateOptions(slidesTree);
    }

    document.body.classList.add('manager');
  }

  componentDidMount() {
    const editableAreas = document.getElementsByClassName('editable-area');

    this.contentEditor = new MediumEditor(editableAreas, {
      toolbar: {
        allowMultiParagraphSelection: true,
        buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote'],
        diffLeft: 0,
        diffTop: -10,
        firstButtonClass: 'medium-editor-button-first',
        lastButtonClass: 'medium-editor-button-last',
        relativeContainer: null,
        standardizeSelectionStart: false,
        static: false,
        align: 'center',
        sticky: false,
        updateOnEmptySelection: false,
      },
    });

    this.contentEditor.subscribe('editableInput', (event, editable) => {
      this.props.onChangeContent(editable.innerHTML);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.slidesTree !== nextProps.slidesTree) {
      this.generateOptions(nextProps.slidesTree);
    }
  }

  componentWillUnmount() {
    this.contentEditor.destroy();
    document.body.classList.remove('manager');
  }

  generateOptions(slides) {
    this.selectOptions = [];

    this.selectOptions.push({
      value: '',
      text: '* Root *',
      key: 'root',
    });

    const generateOptionsBySlides = (array) => {
      forEach(array, (slide) => {
        this.selectOptions.push({
          value: slide._id,
          text: [repeat('-', slide.level), slide.title].join(slide.level > 0 ? ' ' : ''),
          key: slide._id,
        });
      });
    };

    generateOptionsBySlides(slides);
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>ManagerCreatePage</title>
          <meta name="description" content="Description of ManagerCreatePage" />
        </Helmet>

        <Manager>
          <Form>
            <InputGroup
              label={<FormattedMessage {...messages.formInternalIdent} />}
              value={this.props.managerCreatePage.internalIdent}
              onChange={this.props.onChangeInternalIdent}
            />

            <InputGroup
              label={<FormattedMessage {...messages.formTitle} />}
              value={this.props.managerCreatePage.title}
              onChange={this.props.onChangeTitle}
            />

            <SelectGroup
              label={<FormattedMessage {...messages.formParent} />}
              value={this.props.managerCreatePage.parent}
              onChange={this.props.onChangeParent}
              options={this.selectOptions}
            />

            <InputGroup
              label={<FormattedMessage {...messages.formIcon} />}
              type="hidden"
            >
              {this.props.managerCreatePage.icon &&
                <div style={{ marginBottom: 10 }}>
                  <ImageIcon src={this.props.managerCreatePage.icon.url} />
                  {' '}
                  <Button onClick={() => this.props.onAttachIcon(null)}>Remove</Button>
                </div>
              }
              <Uploader
                preset="image"
                uploadOnSelection
                onComplete={({ response }) => {
                  this.props.onAttachIcon(response.data);
                }}
              />
            </InputGroup>

            <textarea className="editable-area" />
            <div>
              <textarea
                style={{
                  width: '100%',
                  height: '150px',
                  background: '#fff',
                  border: '1px solid #ddd',
                }}
                className="editable-area_raw"
                onChange={(evt) => {
                  this.contentEditor.setContent(evt.target.value, 0);
                  this.props.onChangeContent(evt.target.value);
                }}
                value={this.props.managerCreatePage.content}
              />
            </div>

            <Button
              onClick={this.props.onClickSubmit}
            >
              <FormattedMessage {...messages.formCreateAction} />
            </Button>
          </Form>
        </Manager>
      </div>
    );
  }
}

ManagerCreatePage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  slidesTree: PropTypes.array.isRequired,
  managerCreatePage: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  loadSlides: PropTypes.func.isRequired,
  onChangeTitle: PropTypes.func.isRequired,
  onChangeContent: PropTypes.func.isRequired,
  onChangeParent: PropTypes.func.isRequired,
  onChangeInternalIdent: PropTypes.func.isRequired,
  onClickSubmit: PropTypes.func.isRequired,
  onAttachIcon: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  managerCreatePage: makeSelectManagerCreatePage(),
  slidesTree: makeSelectSlidesTree(),
  isLoading: makeSelectSlidesIsLoading(),
  isLoaded: makeSelectSlidesIsLoaded(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadSlides: () => dispatch(loadSlidesAction()),
    onChangeTitle: (evt) => dispatch(changeTitleAction(evt.target.value)),
    onChangeInternalIdent: (evt) => dispatch(changeInternalIdentAction(evt.target.value)),
    onChangeParent: (evt) => dispatch(changeParentAction(evt.target.value)),
    onChangeContent: (value) => dispatch(changeContentAction(value)),
    onClickSubmit: () => dispatch(submit()),
    onAttachIcon: (iconData) => dispatch(changeIconAction(iconData)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'managerCreatePage', reducer });
const withSaga = injectSaga({ key: 'managerCreatePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManagerCreatePage);
