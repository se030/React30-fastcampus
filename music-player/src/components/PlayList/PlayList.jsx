import React, { memo, useCallback } from 'react';
import QueueMusic from '@mui/icons-material/QueueMusic';
import Close from '@mui/icons-material/Close';
import './PlayList.scss';
import classNames from 'classnames'
import { useSelector, useDispatch } from 'react-redux';
import SortableList from '@seyoungkim/sortable-list';
import PlayListItem from './PlayListItem';
import { setCurrentIndex, updatePlaylist } from '../../store/musicPlayerReducer';

const PlayList = ({ showPlayList, setshowPlayList }) => {

  const playList = useSelector( (state) => state.playList );
  const dispatch = useDispatch();

  const onClickItem = useCallback((index) => dispatch(setCurrentIndex(index)), []);
  const onClickClosePlayList = useCallback(() => setshowPlayList(false), [setshowPlayList]);
  const onDropItem = useCallback((newPlayList) => dispatch(updatePlaylist(newPlayList)), [dispatch]);

  const renderItem = useCallback((item, index) => <PlayListItem item={item} index={index} />, []);

  return (
    <div className={classNames('play-list', {'show':showPlayList})}>
      <div className="header">
        <div className="row">
          <QueueMusic className="list" />
          <span>Play list</span>
        </div>
        <Close
          sx={{ fontSize: 22, cursor: 'pointer' }}
          onClick={onClickClosePlayList}
        />
      </div>
      
      <SortableList
        data={playList}
        renderItem={renderItem}
        onClickItem={onClickItem}
        onDropItem={onDropItem}
      >
      </SortableList>
      
      
    </div>
  );
};

export default memo(PlayList);
