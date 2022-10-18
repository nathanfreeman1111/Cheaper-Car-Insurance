'use babel';

import CheaperCarInsuranceView from './cheaper-car-insurance-view';
import { CompositeDisposable } from 'atom';

export default {

  cheaperCarInsuranceView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.cheaperCarInsuranceView = new CheaperCarInsuranceView(state.cheaperCarInsuranceViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.cheaperCarInsuranceView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'cheaper-car-insurance:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.cheaperCarInsuranceView.destroy();
  },

  serialize() {
    return {
      cheaperCarInsuranceViewState: this.cheaperCarInsuranceView.serialize()
    };
  },

  toggle() {
    console.log('CheaperCarInsurance was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
