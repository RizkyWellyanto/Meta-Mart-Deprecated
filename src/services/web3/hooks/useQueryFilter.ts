import { Contract } from '@ethersproject/contracts';
import stringify from 'fast-json-stable-stringify';
import useSWR from 'swr';
import { ChainId } from '../../../config/chainid';

// @ts-ignore TYPE NEEDS FIXING
async function queryFilter(contract: Contract, event, fromBlockOrBlockHash, toBlock) {
  return await contract.queryFilter(event, fromBlockOrBlockHash, toBlock)
}

type QueryFilter = {
  chainId: ChainId;
  shouldFetch: boolean;
  contract: any;
  event: any;
  fromBlockOrBlockHash?: any;
  toBlock?: any;
}

export function useQueryFilter({
  chainId,// = ChainId.ETHEREUM,
  shouldFetch = true,
  // @ts-ignore TYPE NEEDS FIXING
  contract,
  // @ts-ignore TYPE NEEDS FIXING
  event,
  fromBlockOrBlockHash = undefined,
  toBlock = undefined,
}: QueryFilter) {
  const { data } = useSWR(
    shouldFetch ? () => ['queryFilter', chainId, stringify(event), fromBlockOrBlockHash, toBlock] : null,
    () => queryFilter(contract, event, fromBlockOrBlockHash, toBlock)
  )
  return data
}