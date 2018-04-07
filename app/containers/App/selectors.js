/* eslint-disable no-underscore-dangle */
import { createSelector } from 'reselect';
import { forEach, values } from 'lodash';

const selectRoute = (state) => state.get('route');
const selectAppDomain = (state) => state.get('app');

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

// Return all slides
const makeSelectSlides = () => createSelector(
  selectAppDomain,
  (slidesState) => slidesState.getIn(['slides', 'all']).toJS(),
);

// Returl all root slides
const makeSelectSlidesRoot = () => createSelector(
  selectAppDomain,
  (slidesState) => slidesState
    .getIn(['slides', 'all']).toJS()
    .filter((slide) => !slide.parent),
);

const makeSelectSlidesTree = () => createSelector(
  selectAppDomain,
  (slidesState) => {
    // tooo optimize this shit
    const slides = slidesState.getIn(['slides', 'all']).toJS();
    const slidesObjects = {};
    const treeObject = {};

    const rootSlides = [];
    const childrenSlides = [];

    forEach(slides, (slide) => {
      const sld = slide;
      sld.childrens = [];
      slidesObjects[slide._id] = sld;

      if (!sld.parent) {
        rootSlides.push(sld._id);
        treeObject[sld._id] = sld;
      } else {
        childrenSlides.push(sld._id);
      }
    });


    forEach(childrenSlides, (childrenId) => {
      const parent = slidesObjects[childrenId].parent instanceof Object
        ? slidesObjects[childrenId].parent._id
        : slidesObjects[childrenId].parent;

      slidesObjects[parent].childrens.push(slidesObjects[childrenId]);
    });

    const tree = values(treeObject);
    const results = [];

    const eachTree = (pl, lv = 0) => {
      forEach(pl, (slide) => {
        const sl = slide;
        sl.level = lv;
        results.push(sl);

        if (sl.childrens && sl.childrens.length > 0) {
          eachTree(sl.childrens, lv + 1);
        }
      });
    };

    eachTree(tree, 0);

    return results;
  }
);

const makeSelectSlidesIsLoading = () => createSelector(
  selectAppDomain,
  (slidesState) => slidesState.get('slides').get('isLoading'),
);

const makeSelectSlidesIsLoaded = () => createSelector(
  selectAppDomain,
  (slidesState) => slidesState.get('slides').get('isLoaded'),
);

export {
  makeSelectLocation,
  makeSelectSlides,
  makeSelectSlidesRoot,
  makeSelectSlidesIsLoading,
  makeSelectSlidesIsLoaded,
  makeSelectSlidesTree,
};
