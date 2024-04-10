import { Observable, catchError, map, of } from "rxjs";

export function tryObservable<T>(observable: Observable<T>, verifyFn?: (res: T) => boolean): Observable<boolean> {
    return observable.pipe(
        map((res) => {
            if (!verifyFn) return true;

            return verifyFn(res);
        }),
        catchError(err => {
            console.log("Error", err);
            return of(false);
        })
    )
}