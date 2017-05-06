type Success = { success: true, value: boolean };
type Failed = { error: false, message: string };

type Response = Success | Failed;

function handleResponse(response: Response) {
  if (response.success) {
    var value: boolean = response.value; // Works!
  } else {
    var error: string = response.message; // Works!
  }
}
