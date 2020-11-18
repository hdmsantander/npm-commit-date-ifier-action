# NPM commit/date ifier action

This action uses NPM as an action to add the commit id and the date of the commit to an object parsed from a JSON file. Updating the original file.

The project is compiled using **ncc**.

```
ncc build index.js --license licenses.txt
```

## Inputs

### `json`

**Required** The name of the JSON file to load and update with the commit id and date.

## Outputs

### `json`

The same JSON file but updated with the commit id and the date.

## Example of input - output

### JSON file before

_pet.json_

```
{
  "pet": "dog"
}
```

### JSON file after

_pet.json_

```
{
  "pet": "dog",
  "commitId": "3198698c96323bfcffb1524fe95eb60bf6966406",
  "date": "2020-11-17T16:37:14-06:00"
}
```

The output can be used from the same JSON file or as output from the step in the following steps within the same job:

```
- name: Echo output
  run: echo "The result of the JSON transformation was ${{ steps.transform-json.outputs.json }}"
```

## Example usage of action

_.github/workflows/main.yml_

```
- name: Transform JSON
  id: transform-json
  uses: hdmsantander/npm-commit-date-ifier-action@v1.0
  with:
    json: ${{ env.workspace }} pet.json
```
