import { gql } from '@apollo/client';
import React from 'react';
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';import { SvgUri } from 'react-native-svg';
import { isAdmin } from '../../../../controllers/Admin';
import { ApplianceType, ScheduledTime } from '../../../../models/ApplianceModel';
import { folderCommonStyles } from '../common/FolderCommonStyles';

export type Props = {
  applianceId: string;
  userId: string;
  name: string;
  type: ApplianceType;
  scheduled: Array<ScheduledTime>;
};

export type ListProps = {
  scheduled: ScheduledTime;
};

/**
 * Displays the scheduled times for the given appliance
 * 
 * @name ViewApplicationPageExtraInfo
 * @param scheduled List of scheduled times
 * @returns React element
 */
const ViewApplicationPageExtraInfo: React.FC<ListProps> = ({scheduled}) => {
  let start = new Date(scheduled.startTime * 1000)
  let end = new Date(scheduled.endTime * 1000)
  console.log(scheduled.startTime)
  return (
    <View>
      <Text style={{
        padding: 10,
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 20,
        opacity: 100,
        color: '#127589',
        fontSize: 17
      }}>
        {start.toString().substring(4, start.toString().indexOf('GMT')) + 'to\n' + end.toString().substring(4, end.toString().indexOf('GMT'))}
      </Text>
    </View>
  )
}

/**
 * Displays the appliance item
 * 
 * @name ViewAppliancesPageItem
 * @param applianceId
 * @param userId
 * @param name
 * @param type
 * @param scheduled
 * @returns React element
 */
const ViewAppliancesPageItem: React.FC<Props> = ({
  applianceId,
  userId,
  name,
  type,
  scheduled
}) => {
  let [opened, setOpened] = React.useState(false)

  let currentTime = Date.now() / 1000;
  let futureStatus = '';
  let futureTime = 0;
  let futureTimeInEnglish = '';

  for (let i = 0; i < scheduled.length; ++i) {
    let scheduledTime = scheduled[i];

    if (scheduledTime.startTime <= currentTime && scheduledTime.endTime >= currentTime) {
      futureStatus = 'Available in\n'
      futureTime = scheduledTime.endTime - currentTime;
      break;
    } else {
      if (scheduledTime.startTime >= currentTime) {
        futureStatus = 'In use in\n'
        futureTime = Math.min(scheduledTime.startTime - currentTime)
      }
    }
  }

  if (futureTime > 0) {
    let days = Math.floor(futureTime / (3600 * 24))
    let hours = Math.floor(futureTime / 3600) % 24;
    let minutes = Math.floor((futureTime % 3600) / 60)
    let seconds = Math.floor(futureTime % (3600 * 60)) % 60

    let daysText = days >= 0 ? days + 'd ' : ''
    let hoursText = hours > 0 ? hours + 'hr ' : ''
    let minutesText = minutes > 0 ? minutes + 'm ' : ''
    let secondsText = seconds > 0 ? seconds + 's ' : ''
    futureTimeInEnglish = daysText + hoursText + minutesText + secondsText
  }

  let [extraInfoStyle, setInfoState] = React.useState(setVisible(true));


  
  return (
      <Pressable style={[styles.roundedContainer, folderCommonStyles.column, {
        backgroundColor: 'white',
        opacity: 0.8,
        marginBottom: 20
      }]}
      onPress={() => {
        setOpened(!opened)
        setInfoState(setVisible(opened))
        console.log(opened)
      }}
      >
        <View style = {[folderCommonStyles.row]}>
          <SvgUri uri={type.getIconAsset()}>

          </SvgUri>
          
          <View style = {[folderCommonStyles.column]}>
            <Text style={styles.nameLabel}>
              {name}
            </Text>

            <Text style={styles.availability}>
              {futureStatus + futureTimeInEnglish}
            </Text>

          </View>


        </View>

        <View style={extraInfoStyle}>
          <Text style= {{
            fontSize: 18
          }}>
            {'Scheduled for'}
          </Text>
          
          <FlatList style={styles.listContainer}
                contentContainerStyle = {{ paddingBottom: 20 }}
                data = {scheduled as readonly any[] | null | undefined}
                renderItem = {({item}) => 
                    <ViewApplicationPageExtraInfo 
                        scheduled = {item}
                    /> 
                }
          />

          <View style={[folderCommonStyles.row, {
          }]}>
            <Pressable style ={[{
              backgroundColor: '#127589',
              padding: 10,
              alignSelf: 'flex-start',
              marginTop: 10,
              borderRadius: 20,
              paddingHorizontal: 20
            }, extraInfoStyle]}>
              <Text style ={{
                color: 'white',
                fontSize: 25
              }}>
                {'Reserve'}
              </Text>
            </Pressable>

            <View style ={extraInfoStyle}>
              <DeleteButton
                isAdmin={isAdmin(userId)}
                applianceId= {applianceId}
                isOpen= {opened}
              ></DeleteButton>
            </View>
          </View>
        </View>


    </Pressable>
  );
};


export type DeleteProps = {
  isAdmin: boolean;
  applianceId: string;
  isOpen: boolean;
};

const DeleteButton: React.FC<DeleteProps> = ({isAdmin, applianceId, isOpen}) => {
  if (!isAdmin) {
    return (<View></View>)
  }

  if (isOpen) {
    return (<View></View>)
  }

  return (
    <Pressable style ={[{
      backgroundColor: '#127589',
      alignSelf: 'flex-start',
      marginTop: 10,
      borderRadius: 20,
      paddingHorizontal: 20,
      padding: 10,
      marginLeft: 20
    }]}>
      <Text style ={{
        color: 'white',
        fontSize: 25
      }}>
        {'Delete'}
      </Text>
    </Pressable>
  )
}

const setVisible = (visible: boolean) => {
  console.log('v ' + visible)
  if (visible) {
    return {
      height: -1,
      width: -1
    }
  } else {
    return {
      height: 0,
      width: 0,
      padding: 0,
      margin: 0
    }
  }
}

const styles = StyleSheet.create({
  listContainer: {
    marginTop: '10%',
    width: '100%',
  },

  roundedContainer: {
    width: '95%',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 25,
    borderRadius: 20,

  },

  nameLabel: {
    fontSize: 20,
    padding: 15,
    paddingTop: 0,
    paddingBottom: 5
  },

  availability: {
    fontSize: 17,
    padding: 15,
    paddingTop: 0,
    color: 'red'
  }

});

export default ViewAppliancesPageItem;