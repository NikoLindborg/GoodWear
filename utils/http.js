/**
 * A ready fetch function use for fetching in apiHooks
 *
 *
 * @Author Aleksi Kytö, Niko Lindborg, Aleksi Kosonen
 * */

const doFetch = async (url, options) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (json.error) {
    throw new Error(json.message + ': ' + json.error);
  } else if (!response.ok) {
    throw new Error('Something went wrong fetching');
  } else {
    return json;
  }
};

export {doFetch};
