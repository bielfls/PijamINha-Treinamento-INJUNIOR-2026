
export interface ApiHookState<TPayload, TData>{
    data?:TData;
    error?: Error;
    isPending:boolean;
    isSuccess:boolean;
    isError:boolean;
    execute: (payload: TPayload) => void;
    reset?: ()=> void;
}



