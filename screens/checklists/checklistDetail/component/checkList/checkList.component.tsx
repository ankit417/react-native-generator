import React from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useDispatch} from '@src/store';
import {HStack, VStack} from '@src/commons';
import {colors} from '@src/modules';

import {styles} from './checkList.style';
import type {ChecklistItems} from '../../checklistDetail.service';
import {checkUncheckChecklist} from '../../checklistDetail.slice';

const CheckList = ({
  checklists,
  checklistId,
}: {
  checklists: Array<ChecklistItems>;
  checklistId: number;
}) => {
  return (
    <>
      <View style={styles.checklistHeader}>
        <Text style={styles.checklistHeaderText}>Before Arriving the Site</Text>
      </View>

      {checklists.map((item, index) => (
        <ChecklistItem key={index} {...item} checklistId={checklistId} />
      ))}
    </>
  );
};

// MARK: - CheckListItem
const ChecklistItem = ({
  id,
  is_checked,
  description,
  checked_by,
  type,
  checklistId,
}: ChecklistItems & {checklistId: number}) => {
  const dispatch = useDispatch();
  const isCheckbox = type === 'checkbox';

  return (
    <TouchableOpacity
      style={styles.checklistItemWrapper}
      activeOpacity={isCheckbox ? 0.6 : 1}
      onPress={
        isCheckbox
          ? () =>
              dispatch(
                checkUncheckChecklist({
                  checklistId,
                  checklistItemId: id,
                  body: {is_checked: !is_checked},
                }),
              )
          : undefined
      }>
      {isCheckbox && (
        <View style={styles.iconWrapper}>
          {is_checked ? (
            <MaterialCommunityIcon
              name="checkbox-marked"
              size={20}
              color={colors.light.primaryColor}
            />
          ) : (
            <MaterialCommunityIcon
              name="checkbox-blank-outline"
              size={20}
              color={colors.light.primaryColor}
            />
          )}
        </View>
      )}

      <View style={styles.checklistTextWrapper}>
        <VStack>
          <View style={styles.checklistTitleWrapper}>
            <Text
              style={[
                styles.checklistTitleText,
                type === 'header' ? styles.headerStyle : undefined,
              ]}>
              {description}
            </Text>
          </View>

          {isCheckbox && (
            <HStack style={styles.checklistItemDetailWrapper}>
              <View style={styles.checklistItemDetailItem}>
                <Text style={styles.detailLabel}>Checked by: </Text>
                <Text style={styles.detailValue}>{checked_by}</Text>
              </View>
            </HStack>
          )}
        </VStack>
      </View>
    </TouchableOpacity>
  );
};

export {CheckList};
