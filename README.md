# Pairing Tools
Display a student's previous project partners on Google Sheets. Includes an API
that is used to integrate with the
[`hbpair-cli`](https://github.com/atrnh/hbpair-cli) command line tool.

![Screenshot](/screenshots/pairing-tools.png)

You still get the freedom of assigning pairs by hand, without the overhead of
flipping through previous sheets to see if two students have worked together
before.

## Contents
- [Installation](https://github.com/atrnh/google-pairing-tools#installation)
- [How it works](https://github.com/atrnh/google-pairing-tools#how-it-works)
- [To do](https://github.com/atrnh/google-pairing-tools#to-do)

## Installation
Currently, this is not an add-on that you can just install (but it might be,
later) so you're gonna have to do this for now:

1. Open your spreadsheet in Google Sheets
2. Go to `Tools > Script editor...`, this should open the script editor in a
   new tab/window.
3. It should automatically create a `Code.gs` for you. Copy and paste the
   contents of `Code.gs` into *your* spreadsheet's `Code.gs`
4. Now make a new HTML document by clicking `File > New > Html file` and name
   it `pairs-sidebar.html`. Again, copy and paste the contents of
   `pairs-sidebar.html` into *your* `pairs-sidebar.html`
5. Make sure you have everything saved
6. Go back to your spreadsheet and refresh the page. You should see a new menu
   called `Pairing Tools`
7. To use the tool, click on `Pairing Tools > Show previous pairs` and the
   previous pairs sidebar will appear.

### About All Pairs
If you are using [`hbpair-cli`](https://github.com/atrnh/hbpair-cli), you don't
have to worry about this.

This add-on needs a sheet called `All Pairs` in order to work. It's essentially
the back end for the app.

The add-on assumes that `All Pairs` contains a header, like so:

![All Pairs example](/screenshots/all-pairs.png)

## How it works
*Coming soon*

## To do
- [ ] AppScript - a write-up about how this all works 
- [ ] Turn this into an installable add-on
- [x] Integrate with [`hbpair-cli`](https://github.com/atrnh/hbpair-cli)
