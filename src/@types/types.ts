type Balance = {
    chainName: string;
    ether: bigint
}

type FormState = {
    address: string;
    valid: boolean;
    error: string;
}