import React, { useEffect } from 'react'
import { useGetUserToUserTransactionsQuery } from '../../APIs/transactionAPI'
import { personalAccountHolderProfileModel } from '../../Interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../Storage/Redux/store'
import { setUserToUserTransactions } from '../../Storage/Redux/transactionSlice'

function MyTransactions() {

  const profileData : personalAccountHolderProfileModel = useSelector((state: RootState) => state.personalAccountHolderStore); 

  const dispatch = useDispatch();

  const {data: userToUserTransactions, isLoading: userToUserTransactionsLoading} = useGetUserToUserTransactionsQuery(profileData.accountId, {skip: profileData.accountId === 0}); 

  useEffect(() => {
    if(userToUserTransactions && !userToUserTransactionsLoading)
    {
        dispatch(setUserToUserTransactions(userToUserTransactions.result));
        console.log(userToUserTransactions.result);
    }
  }, [userToUserTransactions])

  return (
    <div>MyTransactions</div>
  )
}

export default MyTransactions