import { Observable, catchError, map, of } from "rxjs";

export function tryObservable<T>(observable: Observable<T>, verifyFn?: (res: T) => boolean, onError?: (error: any) => void): Observable<boolean> {
    return observable.pipe(
        map((res) => {
            if (!verifyFn) return true;

            return verifyFn(res);
        }),
        catchError(err => {
            if (onError) {
                onError(err);
            }
            return of(false);
        })
    )
}