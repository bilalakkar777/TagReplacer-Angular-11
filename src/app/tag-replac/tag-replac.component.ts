import { Component, OnInit } from '@angular/core';
import {Replacement} from './replacement';

@Component({
  selector: 'app-tag-replac',
  templateUrl: './tag-replac.component.html',
  styleUrls: ['./tag-replac.component.scss']
})
export class TagReplacComponent implements OnInit {

  public inputText: string = null;
  public outputText: string = null;
  public allSelected = false;

  public replacements: Replacement[] = [];

  constructor() {
    this.replacements = [
      {selected: true,  tag: 'foo', replacement: 'bar'},
      {selected: true,  tag: 'escaping', replacement: 'ERROR'},
      {selected: true,  tag: 'tag', replacement: '{tag}'},
      {selected: false, tag: 'invalid tags', replacement: 'ERROR'},
      {selected: true,  tag: 'ddd', replacement: 'ERROR'},
    ];
  }

  ngOnInit(): void {
    this.inputText = 'This text contains some {foo} tags that will be replaced. It supports \\{escaping} and it ignores {unknown} tags and {invalid tags}. A literal backslash can be written as well:\\\\ wild \\backslashes are removed. Even in front of a \\\\\\\\{tag} , --> Another test: \\a \\\\b \\\\ c \\{ddd}';
  }

  // Add an empty Tag & Replacement
  public AddEmptyReplacement(): void {
    this.replacements.push(new Replacement());
  }

  // Remove all selected replacements
  public RemoveAllSelected(): void {
    for (let i = 0; i < this.replacements.length; i++) {
      const r = this.replacements[i];
      if (r.selected) {
        this.replacements.splice(i, 1);
        i--;
      }
    }
    // if all removed, reset select all checkbox
    this.allSelected = false;
  }

  /** Check selected replacements to indeterminate select all [X] */
  public IsIndeterminate(): boolean {
    return this.replacements.filter(t => t.selected).length > 0 && !this.allSelected;
  }

  /** Select all replacements */
  public SelectAll(checked: boolean): void {
    this.allSelected = checked;
    this.replacements.forEach(t => t.selected = checked);
  }


  /** Check whether all checkboxes are selected or not */
  public CheckIfAllSelected(): void {
    this.allSelected = this.replacements.length && this.replacements.every(t => t.selected);
  }


  /** Check if one or many replacements selected */
  public CheckIfOneOrManySelected(): boolean {
    return !!this.replacements.filter(t => t.selected).length;
  }

  /** Replace replacements */
  public Replace(): void {
    let input: string = this.inputText;

    // matches exactly 2 consecutive `\` characters and replace them with one `\`. e g. \\ -> \
    input = input.replace(/(\\{2})(?![\w])/g, '\\');

    // Matches wild backslash which has positive lookahead with a-z or A-Z or 0-9 and remove it (backslash). e.g. \b -> b
    input = input.replace(/\\(?=[a-zA-Z0-9])/g, '');

    // Replacement logic
    for (const item of this.replacements) {
      // If the replacements not selected, skiping here.
      if (!item.selected) {
        continue;
      }

      const tag: string = item.tag;
      let replacement: string = item.replacement;

      // Check whether the replacement has both tag and replacement.
      if (tag && replacement) {
        // Replace replacements e g. {tag} --> tag
        replacement = replacement.replace(/\{|\}/g, '');

        // Create the bar using tag as the identifier and also skips escaping. e.g. {foo} -> bar
        const bar: RegExp = new RegExp(`(?<!\\s\\\\)\{${tag}\}`, 'g');
        input = input.replace(bar, replacement);
      }
    }

    // replaces escaped words without the backslash. e.g. \{escaping} --> {escaping}
    input = input.replace(/(?<!\\)\\(?=[{])/g, '');

    // output text with replaced input
    this.outputText = input;
    // Das alles
  }

}

